package br.com.projetonotafiscal.notafiscal.DTO;

import br.com.projetonotafiscal.notafiscal.Entity.Cliente;
import com.fasterxml.jackson.annotation.JsonProperty;

public class DadosAtualizaCliente {

    private Long id;
    private String nome;

    public DadosAtualizaCliente() {
    }

    public DadosAtualizaCliente(Cliente cliente) {
        this.id = cliente.getId();
        this.nome = cliente.getNome();
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }
}
