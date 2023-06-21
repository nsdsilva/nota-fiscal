package br.com.projetonotafiscal.notafiscal.Controller;

import br.com.projetonotafiscal.notafiscal.DTO.NotaDTO;
import br.com.projetonotafiscal.notafiscal.Entity.Nota;
import br.com.projetonotafiscal.notafiscal.Service.NotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
