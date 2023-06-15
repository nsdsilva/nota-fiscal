package br.com.projetonotafiscal.notafiscal.Controller;

import br.com.projetonotafiscal.notafiscal.DTO.DadosAtualizaProduto;
import br.com.projetonotafiscal.notafiscal.DTO.DadosCadastroProduto;
import br.com.projetonotafiscal.notafiscal.DTO.DadosListagemProduto;
import br.com.projetonotafiscal.notafiscal.Service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/produto")
public class ProdutoController {

    @Autowired
    private ProdutoService service;

    @PostMapping
    @Transactional
    public ResponseEntity salvar(@RequestBody DadosCadastroProduto dto) {
        DadosListagemProduto dados = service.salvar(dto);

        return ResponseEntity.ok(dados);
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizar(@RequestBody DadosAtualizaProduto dto) {
        DadosListagemProduto dados = service.atualizar(dto);

        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemProduto>> buscarTodos(@PageableDefault(size = 10, sort = {"codigo"}) Pageable paginacao) {
        Page dto = service.listarTodos(paginacao);

        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity detalha(@PathVariable Long id) {
        DadosListagemProduto dto = service.detalhar(id);

        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletar(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.ok("Excluído com Sucesso!");
    }
}
