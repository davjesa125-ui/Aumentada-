# Memoria Viva AR — Arquitectura

Aplicación WebXR que lleva las fotografías históricas (acto escolar, camioneta "137", río y botes, balsa, puente en construcción / inauguración / ruinas, pasarela colgante) al espacio físico como "ventanas al pasado".

## 0. Límites reales de la plataforma (leer primero)

| Capacidad pedida | Estado real hoy | Decisión |
|---|---|---|
| WebXR immersive-ar | Chrome/Edge Android (ARCore). **iOS Safari no lo soporta** | Fallback iOS: `<model-viewer>` + Quick Look (USDZ), o MindAR/8th Wall |
| Depth sensing (oclusión) | Chrome Android con ARCore Depth, solo en equipos compatibles | Se pide como `optionalFeature`; si falta, sin oclusión |
| Light estimation | Soportado en Chrome Android | `XREstimatedLight` de three.js |
| Hand tracking | Solo headsets (Quest, Vision Pro). **No en celulares** | Opcional; en celular se usa tacto + mirada |
| Image tracking (anclar a la foto impresa) | Experimental, bajo flag en Chrome | Fallback: MindAR (basado en ML, 100% web) |
| Cloud Anchors / persistencia multiusuario | **No existe en WebXR estándar** | Anclas locales + backend propio (coordenadas relativas a un marcador compartido) o ARCore Geospatial nativo |
| Segmentación semántica | Plane detection da pisos/paredes; segmentación por píxel requeriría modelo propio (TF.js / MediaPipe) | Fase 2 |

## 1. Diagrama conceptual

```
┌──────────────────────── Dispositivo ────────────────────────┐
│  Cámara/ARCore ──► XRSession ─┬─► Hit-test ───► Reticle     │
│                               ├─► Depth (gpu) ► Shader occl.│
│                               ├─► LightProbe ─► XRLight/IBL │
│                               ├─► Planes ─────► Colisión    │
│                               └─► Anchors ────► Persistencia│
│                                                              │
│  Input: Tacto / Mirada(dwell) / Hand(pinch, si hay)         │
│        │                                                     │
│        ▼                                                     │
│  SceneManager ──► PhotoPanel (plano + marco + capas)        │
│        │          Timeline (puente: obra→inauguración→ruina)│
│        │          SpatialAudio (HRTF, PannerNode)           │
│        ▼                                                     │
│  UI DOM-overlay (glassmorphism: ficha, slider "capa")       │
└───────────────┬──────────────────────────────────────────────┘
                │ WebSocket/WebRTC (fase 2)
                ▼
   Servidor de sala: sincroniza pose de anclas + cursores
   Servicio IA (fase 2): frame → visión → descripción contextual
```

## 2. Estructura de archivos

```
memoria-viva-ar/
├─ index.html
├─ package.json
├─ ARQUITECTURA.md
├─ public/
│  ├─ fotos/            # tus 11 fotos recortadas y en KTX2/WebP
│  └─ audio/            # ambientes (río, multitud, motor)
└─ src/
   ├─ main.ts           # sesión XR, bucle, hit-test, luz, oclusión
   ├─ content/escenas.ts# manifiesto de fotos y metadatos
   ├─ xr/occlusion.ts   # (fase 2) extraer parche de oclusión
   ├─ net/sync.ts       # (fase 2) WebSocket de sala
   └─ ai/context.ts     # (fase 2) asistente contextual
```

## 3. Guía de optimización (60 FPS en móvil)

- **Draw calls:** cada foto es 1 plano + 1 marco; fusioná marcos en un `InstancedMesh`. Meta: < 50 draw calls.
- **Texturas:** convertí las fotos a **KTX2 (Basis Universal)** con `toktx`/`gltf-transform`; máx. 2048 px de lado mayor; mipmaps activados. Un JPG 2048² ocupa ~16 MB en GPU, un KTX2 ETC1S ~1–2 MB.
- **Escaneos:** las fotos tienen líneas violetas de escaneo y manchas; limpiarlas antes (inpainting/recorte) mejora más la calidad que subir resolución.
- **Pixel ratio:** `renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))`; usar `xr.setFramebufferScaleFactor(0.8)` si baja de 55 FPS.
- **LOD dinámico:** versiones 512/1024/2048 de cada foto; cambiar según distancia a cámara.
- **Sombras:** evitar sombras reales; usar un plano de sombra falsa (textura baked).
- **Oclusión:** usar depth `gpu-optimized` (sin leer a CPU); resolver en el fragment shader.
- **Antialias:** desactivado en XR de gama baja; el framebuffer de XR ya aplica el suyo.
- **Memoria:** `texture.dispose()` de las escenas que no están en uso; cargar bajo demanda.
- **Medición:** `renderer.info`, Chrome `chrome://inspect` + Perfetto, y Spector.js.
