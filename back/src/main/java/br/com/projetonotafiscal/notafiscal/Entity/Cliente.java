package br.com.projetonotafiscal.notafiscal.Entity;

import br.com.projetonotafiscal.notafiscal.DTO.ClienteDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "Cliente")
@Table(name = "cliente")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    private String nome;


    public Cliente() {}

    public Cliente(int id) {
        this.id = Long.valueOf(id);
    }

    public Cliente(ClienteDTO dto) {
        this.id = dto.getId();
        this.codigo = dto.getCodigo();
        this.nome = dto.getNome();
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void atualizar(ClienteDTO dto) {
        if (dto.getNome() != null) {
            this.nome = dto.getNome();
        }
    }
}
