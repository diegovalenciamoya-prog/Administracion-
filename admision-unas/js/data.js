/*
 * DATOS DEL PROCESO 2027-I
 * Importante: valores de referencia para el prototipo.
 * Antes de publicar, validar fechas, tarifas, cuenta, vacantes y contactos
 * con la Oficina de Admisión y las bases oficiales vigentes.
 */
window.ADMISION_DATA = {
  process: "2027-I",
  examType: "Ordinario",
  examDate: { day: "29", month: "noviembre", year: "2026" },
  logo: "imagen/logounas.png",
  banner: {
    enabled: true,
    image: "imagen/banner2.jpeg",
    alt: "Examen de admisión ordinario UNAS, 29 de noviembre de 2026"
  },
  dates: {
    virtual: "20 noviembre 2026",
    inPerson: "27 noviembre 2026",
    biometric: "27 noviembre 2026"
  },
  bankAccount: "00490018638",
  fees: {
    general: { publico: 280, privado: 350 },
    special: { publico: 350, privado: 400 },
    specialCareerIds: [13,14,15,16,17,18]
  },
  careers: [
    {id:1,name:"Agronomía",vacancies:10},
    {id:2,name:"Administración",vacancies:15},
    {id:3,name:"Contabilidad",vacancies:12},
    {id:4,name:"Economía",vacancies:12},
    {id:5,name:"Ingeniería en Ciberseguridad",vacancies:6},
    {id:6,name:"Ingeniería en Conservación de Suelos y Agua",vacancies:7},
    {id:7,name:"Ingeniería en Industrias Alimentarias",vacancies:12},
    {id:8,name:"Ingeniería en Recursos Naturales Renovables",vacancies:5},
    {id:9,name:"Ingeniería Forestal",vacancies:10},
    {id:10,name:"Ingeniería Mecánica Eléctrica",vacancies:10},
    {id:11,name:"Turismo y Hotelería",vacancies:10},
    {id:12,name:"Zootecnia",vacancies:3},
    {id:13,name:"Ingeniería en Informática y Sistemas",vacancies:15},
    {id:14,name:"Ingeniería Ambiental",vacancies:15},
    {id:15,name:"Ingeniería Civil",vacancies:10},
    {id:16,name:"Derecho y Ciencias Políticas",vacancies:9},
    {id:17,name:"Medicina Veterinaria",vacancies:8},
    {id:18,name:"Farmacia y Bioquímica",vacancies:10}
  ]
};
