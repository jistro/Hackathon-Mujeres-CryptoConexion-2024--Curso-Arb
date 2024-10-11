// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LibroVisitas {
    struct Saludo {
        address autor;
        string mensaje;
        uint256 timestamp;
    }

    Saludo[] private saludos;

    function escribirSaludo(string memory _mensaje) public {
        saludos.push(Saludo(msg.sender, _mensaje, block.timestamp));
    }

    function obtenerSaludo(uint256 _indice) public view returns (address, string memory, uint256) {
        if (_indice > saludos.length) {
            revert ();
        }
        Saludo memory saludo = saludos[_indice -1];
        return (saludo.autor, saludo.mensaje, saludo.timestamp);
    }

    function obtenerTotalSaludos() public view returns (uint256) {
        return saludos.length;
    }

    function obtenerTodosSaludos() public view returns (Saludo[] memory) {
        return saludos;
    }
}