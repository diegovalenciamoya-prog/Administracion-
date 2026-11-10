# Portal informativo de Admisión UNAS

Prototipo frontend desarrollado con HTML, CSS y JavaScript puro.

## Cómo ejecutarlo

1. Descomprime `admision-unas.zip`.
2. Abre la carpeta `admision-unas` en Visual Studio Code.
3. Abre `index.html` en el navegador. Recomendado: usar la extensión **Live Server** de VS Code.
4. No requiere instalación de paquetes ni compilación.

## Estructura

```text
admision-unas/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── data.js
│   └── main.js
└── README.md
```

## Dónde actualizar la información

Edita `js/data.js`. Allí están centralizados:
- Fechas de convocatoria.
- Tipo y fecha del examen, y período del proceso.
- Número de cuenta referencial.
- Tarifas referenciales.
- Carreras y vacantes.
- Ruta del logotipo oficial (`logo`) y activación/imagen del banner (`banner`).

Para mostrar el logo, coloca el archivo autorizado en el proyecto y asigna su ruta relativa en `logo` (por ejemplo, `img/logo-unas.png`). Para mostrar un banner, establece `banner.enabled` en `true` y completa `banner.image` y `banner.alt`.

## Enlaces conectados

- Plataforma de inscripción: https://admision.unas.edu.pe/home/registration
- Documentos de admisión: https://drive.google.com/drive/folders/1r_lJsL9ShyRpVFRjNIkZgnECcvFQfSdd
- Portal institucional: https://unas.edu.pe/

## Antes de publicar

Este material es un prototipo informativo, no un sistema oficial de admisión. Validar con la Oficina de Admisión:
- Fechas y cronograma vigente.
- Tarifas por carrera y procedencia escolar.
- Cuenta bancaria, titular, concepto y procedimiento de pago.
- Vacantes oficiales y distribución por modalidad.
- Requisitos específicos.
- Dirección, horarios y procedimiento biométrico.
- Teléfonos y enlaces de atención.

No se recopilan datos personales ni se procesa una inscripción en este prototipo. El botón de inscripción dirige al sistema institucional existente.

## Identidad visual

Los colores son una propuesta inicial inspirada en una identidad institucional verde. Configura el logotipo oficial autorizado en `js/data.js` antes de publicar; mientras tanto, se muestra una marca tipográfica de respaldo.
