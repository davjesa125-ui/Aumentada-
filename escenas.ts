// Manifiesto de contenido. Los textos marcados "VERIFICAR" son descripciones
// visuales provisorias: completá con fechas, nombres y fuentes documentadas.

export interface Escena {
  id: string;
  archivo: string;          // ruta en /public/fotos
  titulo: string;
  descripcion: string;
  aspecto: number;          // ancho / alto de la foto
  grupo: 'acto' | 'transporte' | 'rio' | 'puente';
  orden?: number;           // para la línea de tiempo del puente
  audio?: string;
}

export const ESCENAS: Escena[] = [
  { id: 'acto-escolar', archivo: 'acto-escolar.webp', aspecto: 1.63, grupo: 'acto',
    titulo: 'Acto escolar frente al palco',
    descripcion: 'Alumnado de guardapolvo blanco formado en U ante un palco con autoridades y la bandera. VERIFICAR: fecha, ocasión, nombre de la escuela.' },
  { id: 'camioneta-137', archivo: 'camioneta-137.webp', aspecto: 1.62, grupo: 'transporte',
    titulo: 'Camioneta N.º 137 y cinco hombres',
    descripcion: 'Vehículo con letrero superior y número 137 en la puerta. VERIFICAR: leyenda del letrero, personas, institución.' },
  { id: 'rio-botes', archivo: 'rio-botes.webp', aspecto: 1.4, grupo: 'rio',
    titulo: 'Botes en el río',
    descripcion: 'Botes con pasajeros frente a una playa con gente. VERIFICAR: río, lugar, fecha.', audio: 'rio.mp3' },
  { id: 'balsa', archivo: 'balsa.webp', aspecto: 1.4, grupo: 'rio',
    titulo: 'Balsa de cruce',
    descripcion: 'Chata/balsa con baranda de madera cruzando el río. VERIFICAR: nombre y recorrido.' },
  { id: 'pasarela', archivo: 'pasarela.webp', aspecto: 1.62, grupo: 'rio',
    titulo: 'Pasarela colgante',
    descripcion: 'Hombre sobre una pasarela colgante de cables. VERIFICAR: ubicación y época.' },
  { id: 'puente-obra-1', archivo: 'puente-obra-1.webp', aspecto: 1.53, grupo: 'puente', orden: 1,
    titulo: 'Puente en construcción — encofrados',
    descripcion: 'Arcos de hormigón con encofrado de madera en el cauce.' },
  { id: 'puente-obra-2', archivo: 'puente-obra-2.webp', aspecto: 1.62, grupo: 'puente', orden: 2,
    titulo: 'Puente en construcción — vista lateral',
    descripcion: 'Tramo con baranda terminada y apuntalamiento aún en el río.' },
  { id: 'puente-obra-3', archivo: 'puente-obra-3.webp', aspecto: 1.55, grupo: 'puente', orden: 3,
    titulo: 'Puente — estructura y andamios',
    descripcion: 'Vista de la obra con andamios y tablones en primer plano.' },
  { id: 'puente-inaug-1', archivo: 'puente-inaug-1.webp', aspecto: 1.4, grupo: 'puente', orden: 4,
    titulo: 'Multitud sobre el puente',
    descripcion: 'Numerosas personas con sombreros y sombrillas sobre el terraplén y el puente.' },
  { id: 'puente-inaug-2', archivo: 'puente-inaug-2.webp', aspecto: 1.33, grupo: 'puente', orden: 5,
    titulo: 'Acto en el acceso al puente',
    descripcion: 'Público reunido en el terraplén; se ve un atril o parlante.' },
  { id: 'puente-ruina', archivo: 'puente-ruina.webp', aspecto: 1.33, grupo: 'puente', orden: 6,
    titulo: 'Grupo familiar frente al puente deteriorado',
    descripcion: 'Personas posando frente a una estructura con tramos caídos. VERIFICAR: si es el mismo puente y qué ocurrió.' },
];
