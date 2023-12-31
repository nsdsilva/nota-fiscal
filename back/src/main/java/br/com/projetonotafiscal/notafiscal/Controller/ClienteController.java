package br.com.projetonotafiscal.notafiscal.Controller;

import br.com.projetonotafiscal.notafiscal.DTO.ClienteDTO;
import br.com.projetonotafiscal.notafiscal.Entity.Cliente;
import br.com.projetonotafiscal.notafiscal.Service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("cliente")
public class ClienteController {

    @Autowired
    private ClienteService service;


    @PostMapping
    @Transactional
    public ResponseEntity salvar(@RequestBody ClienteDTO dados) {
        Cliente dto = service.salvar(dados);

        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity atualizar(@RequestBody ClienteDTO dados) {
        service.atualizar(dados);

        return new ResponseEntity<>(dados, HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity<List<Cliente>> buscarTodos(@PageableDefault(size = 10, sort = {"nome"})Pageable paginacao) {
        List<Cliente> dto = service.listarTodos();

        return ResponseEntity.ok(dto);
    }

    @GetMapping("/buscar-por-nome")
    public List<Cliente> buscarPorNome(@RequestParam String nome) {
        return service.buscarPorNome(nome);
    }


    @GetMapping("/{id}")
    public ResponseEntity detalha(@PathVariable("id") Long id) {
        Cliente dto = service.detalhar(id);

        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletar(@PathVariable("id") Long id) {
        service.excluir(id);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

}
