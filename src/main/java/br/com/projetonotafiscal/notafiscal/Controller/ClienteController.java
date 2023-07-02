package br.com.projetonotafiscal.notafiscal.Controller;

import br.com.projetonotafiscal.notafiscal.DTO.ClienteDTO;
import br.com.projetonotafiscal.notafiscal.Entity.Cliente;
import br.com.projetonotafiscal.notafiscal.Service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("cliente")
public class ClienteController {

    @Autowired
    private ClienteService service;


    @PostMapping
    @Transactional
    public ResponseEntity salvar(@RequestBody ClienteDTO dados) {
        Cliente dto = service.salvar(dados);

        return ResponseEntity.ok(dto);
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizar(@RequestBody ClienteDTO dados) {
        service.atualizar(dados);

        return ResponseEntity.ok("Atualizado com Sucesso!");
    }


    @GetMapping
    public ResponseEntity<Page<ClienteDTO>> buscarTodos(@PageableDefault(size = 10, sort = {"nome"})Pageable paginacao) {
        Page dto = service.listarTodos(paginacao);

        return ResponseEntity.ok(dto);
    }


    @GetMapping("/{id}")
    public ResponseEntity detalha(@PathVariable Long id) {
        Cliente dto = service.detalhar(id);

        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletar(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.ok("Excluído com Sucesso!");
    }

}
