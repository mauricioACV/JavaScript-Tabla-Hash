console.clear();

//Crear función para convertir el string hash en int
function hashStringToInt(s, tableSize) {
  let hash = 17;
  for (let i = 0; i < s.length; i++) {
    hash = (13 * hash * s.charCodeAt(i)) % tableSize;
  }
  return hash;
}

//Crear clase para nuestra estructura de datos
class HashTable {
  table = new Array(3);
  numItems = 0;

  //Para fijar nuevo tamaño de tabla a medida que inserta items
  resize = () => {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach(item => {
      if (item) {
        item.forEach(([key, value]) => {
          const idx = hashStringToInt(key, newTable.length);
          if (newTable[idx]) {
            newTable[idx].push([key, value]);
          } else {
            newTable[idx] = [[key, value]];
          }
        });
      }
    });
    this.table = newTable;
  };

  setItem = (key, value) => {
    this.numItems++;

    const loadFactor = this.numItems / this.table.length;
    if (loadFactor > 0.8) {
      // resize
      this.resize();
    }

    const idx = hashStringToInt(key, this.table.length);
    if (this.table[idx]) {
      this.table[idx].push([key, value]);
    } else {
      this.table[idx] = [[key, value]];
    }
  };

  getItem = (key) => {
    const idx = hashStringToInt(key, this.table.length);
    if (!this.table[idx]) return null;
    return this.table[idx].find((x) => x[0] === key)[1];
  };
}

//Pruebas
const myTable = new HashTable();
console.log("largo tabla inicio",myTable.table.length);
myTable.setItem("firstName", "Mauro");
console.log(myTable.table.length);
myTable.setItem("lastName", "Campusano");
console.log(myTable.table.length);
myTable.setItem("age", 18);
console.log("largo tabla final y con resize",myTable.table.length);
myTable.setItem("date", "11/02/9999");
console.log(myTable.getItem("firstName"));
console.log(myTable.getItem("lastName"));
console.log(myTable.getItem("age"));
console.log(myTable.getItem("date"));
