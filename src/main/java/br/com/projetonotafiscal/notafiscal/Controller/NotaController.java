package br.com.projetonotafiscal.notafiscal.Controller;

import br.com.projetonotafiscal.notafiscal.DTO.NotaDTO;
import br.com.projetonotafiscal.notafiscal.DTO.ProdutoDTO;
import br.com.projetonotafiscal.notafiscal.Entity.Nota;
import br.com.projetonotafiscal.notafiscal.Entity.Produto;
import br.com.projetonotafiscal.notafiscal.Service.NotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/nota")
public class NotaController {

    @Autowired
    private NotaService service;


    @PostMapping
    @Transactional
    public ResponseEntity salvar(@RequestBody NotaDTO dto) {
        Nota nota = service.salvar(dto);

        return ResponseEntity.ok("Salvo com sucesso.");
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizar(@RequestBody NotaDTO dto) {
        service.atualizar(dto);

        return ResponseEntity.ok("Atualizado com sucesso.");
    }

    @GetMapping
    public ResponseEntity<Page<NotaDTO>> buscarTodos(@PageableDefault(size = 10, sort = {"id"}) Pageable paginacao) {
        Page dto = service.listarTodos(paginacao);

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

        return ResponseEntity.ok("Excluído com Sucesso!");
    }
}
