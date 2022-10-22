// Importaciones
const fs = require("fs");
var CryptoJS = require("crypto-js");

// Metodos de codificacion/decodificacion de String
// Codificacion
function cifrarDES(Mensaje, Clave) {
	console.log("Cifrado String");
	var encrypt = CryptoJS.DES.encrypt(Mensaje, Clave);
	return encrypt.toString();
}
// Decodificacion
function descifrarDES(MensajeCodificado, Clave) {
	console.log("Descifrado String");
	var decrypt = CryptoJS.DES.decrypt(MensajeCodificado, Clave);
	return decrypt.toString(CryptoJS.enc.Utf8);
}
// * Codificacion de un .txt
function codificarFile(ArchivoEntrada, ArchivoSalida, Clave) {
	console.log("Cifrado Archivo");
	fs.readFile(ArchivoEntrada, (err, data) => {
		// data -> Buffer (Binario)
		// err -> Error
		if (!err) {
			// Aqui se lleva a cabo la codificacion del archivo
			console.log("...");
			fs.writeFile(
				ArchivoSalida,
				cifrarDES(data.toString(), Clave),
				function (err) {
					if (err) throw err;
					console.log("Archivo codificado correctamente!");
				}
			);
			// * Prueba para imprimir el contenido del archivo
			// // console.log(data.toString( ));
		} else {
			// ! Mostrar el error (Si hay) en consola
			console.log(err);
		}
	});
}

// * DeCodificacion de un .txt
function decodificarFile(ArchivoEntrada, ArchivoSalida, Clave) {
	console.log("Descifrado Archivo");
	fs.readFile(ArchivoEntrada, (err, data) => {
		// data -> Buffer (Binario)
		// err -> Error
		if (!err) {
			// Aqui se lleva a cabo la codificacion del archivo
			fs.writeFile(
				ArchivoSalida,
				descifrarDES(data.toString(), Clave),
				function (err) {
					if (err) throw err;
					console.log("Archivo decodificado correctamente!");
				}
			);
			// * Prueba para imprimir el contenido del archivo
			// // console.log(data.toString( ));
		} else {
			// ! Mostrar el error (Si hay) en consola
			console.log(err);
		}
	});
}

module.exports = function encdec(Entrada, Salida, Clave, Mode) {
	console.log("Principal");
	if (Mode == "1") {
		codificarFile(Entrada, Salida, Clave);
		return;
	} else if (Mode == "2") {
		decodificarFile(Entrada, Salida, Clave);
		return;
	}
};
