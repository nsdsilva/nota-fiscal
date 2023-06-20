package br.com.projetonotafiscal.notafiscal.Controller;

import br.com.projetonotafiscal.notafiscal.DTO.ClienteDTO;
import br.com.projetonotafiscal.notafiscal.DTO.ItensDTO;
import br.com.projetonotafiscal.notafiscal.Entity.Cliente;
import br.com.projetonotafiscal.notafiscal.Entity.Itens;
import br.com.projetonotafiscal.notafiscal.Service.ItensService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/itens")
public class ItensController {

    @Autowired
    private ItensService service;


    @PostMapping
    @Transactional
    public ResponseEntity salvar(@RequestBody ItensDTO dados) {
        Itens dto = service.salvar(dados);

        return ResponseEntity.ok(dto);
    }
}
