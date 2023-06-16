package br.com.projetonotafiscal.notafiscal.DTO;

import br.com.projetonotafiscal.notafiscal.Entity.Cliente;

public class ClienteDTO {

    private Long id;
    private String nome;
    private String codigo;

    public ClienteDTO() {}

    public ClienteDTO(Cliente cliente) {
        this.id = cliente.getId();
        this.nome = cliente.getNome();
        this.nome = cliente.getCodigo();
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
}
