package br.com.projetonotafiscal.notafiscal.Controller;

import br.com.projetonotafiscal.notafiscal.DTO.NotaDTO;
import br.com.projetonotafiscal.notafiscal.Entity.Nota;
import br.com.projetonotafiscal.notafiscal.Service.NotaService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/nota")
public class NotaController {

    @Autowired
    private NotaService service;

    private static final Logger logger = LoggerFactory.getLogger(NotaController.class);



    @PostMapping
    @Transactional
    public ResponseEntity salvar(@RequestBody NotaDTO dto) {
        Nota nota = service.salvar(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity atualizar(@RequestBody NotaDTO dto) {
        service.atualizar(dto);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Nota>> buscarTodos() {
        List<Nota> dto = service.listarTodos();

        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity detalha(@PathVariable Long id) {
        Nota dto = service.detalhar(id);

        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletar(@PathVariable Long id) {
        service.excluir(id);

        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
