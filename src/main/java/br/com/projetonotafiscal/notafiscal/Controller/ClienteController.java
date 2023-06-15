package br.com.projetonotafiscal.notafiscal.Controller;

import br.com.projetonotafiscal.notafiscal.DTO.DadosAtualizaCliente;
import br.com.projetonotafiscal.notafiscal.DTO.DadosCadastroCliente;
import br.com.projetonotafiscal.notafiscal.DTO.DadosListagemCliente;
import br.com.projetonotafiscal.notafiscal.Service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteService service;


    @PostMapping
    @Transactional
    public ResponseEntity salvar(@RequestBody DadosCadastroCliente dados) {
        DadosListagemCliente dto = service.salvar(dados);

        return ResponseEntity.ok(dto);
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizar(@RequestBody DadosAtualizaCliente dados) {
        DadosListagemCliente dto = service.atualizar(dados);

        return ResponseEntity.ok(dto);
    }


    @GetMapping
    public ResponseEntity<Page<DadosListagemCliente>> buscarTodos(@PageableDefault(size = 10, sort = {"nome"})Pageable paginacao) {
        Page dto = service.listarTodos(paginacao);

        return ResponseEntity.ok(dto);
    }


    @GetMapping("/{id}")
    public ResponseEntity detalha(@PathVariable Long id) {
        DadosListagemCliente dto = service.detalhar(id);

        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletar(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.ok("Excluído com Sucesso!");
    }

}
