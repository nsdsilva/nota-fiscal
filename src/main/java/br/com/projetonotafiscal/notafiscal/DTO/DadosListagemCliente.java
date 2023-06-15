package br.com.projetonotafiscal.notafiscal.DTO;

import br.com.projetonotafiscal.notafiscal.Entity.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.stream.Collectors;

public class DadosListagemCliente {

    private Long id;
    private Long codigoCliente;
    private String nome;

    public DadosListagemCliente(Cliente cliente) {
        this.id = cliente.getId();
        this.codigoCliente = cliente.getCodigoCliente();
        this.nome = cliente.getNome();
    }

    public Long getId() {
        return id;
    }

    public Long getCodigoCliente() {
        return codigoCliente;
    }

    public String getNome() {
        return nome;
    }
}
