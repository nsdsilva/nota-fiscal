package br.com.projetonotafiscal.notafiscal.Controller;

import br.com.projetonotafiscal.notafiscal.DTO.ProdutoDTO;
import br.com.projetonotafiscal.notafiscal.Entity.Produto;
import br.com.projetonotafiscal.notafiscal.Service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService service;

    @PostMapping
    @Transactional
    public ResponseEntity salvar(@RequestBody ProdutoDTO dto) {
        Produto dados = service.salvar(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(dados);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity atualizar(@RequestBody @Validated ProdutoDTO dto) {
        service.atualizar(dto);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Produto>> buscarTodos() {
        List<Produto> dto = service.listarTodos();

        return ResponseEntity.ok(dto);
    }


    @GetMapping("/buscar")
    public ResponseEntity<List<Produto>> buscarLike(@RequestParam("descricao") String descricao) {
        List<Produto> produtos = service.buscaLike(descricao);

        return new ResponseEntity(produtos, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity detalha(@PathVariable Long id) {
        Produto dto = service.detalhar(id);

        return ResponseEntity.ok(dto);
    }



    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletar(@PathVariable Long id) {
        service.excluir(id);

        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
