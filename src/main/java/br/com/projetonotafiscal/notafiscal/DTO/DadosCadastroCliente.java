package br.com.projetonotafiscal.notafiscal.DTO;

import br.com.projetonotafiscal.notafiscal.Entity.Cliente;
import br.com.projetonotafiscal.notafiscal.Repository.ClienteRepository;

public class DadosCadastroCliente {
    private String nome;
    private Long codigo_cliente;

    public DadosCadastroCliente() {}

    public DadosCadastroCliente(Cliente cliente) {
        this.nome = cliente.getNome();
    }

    public String getNome() {
        return nome;
    }

    public Long getCodigo_cliente() {
        return codigo_cliente;
    }
}
