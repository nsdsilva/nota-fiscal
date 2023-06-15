package br.com.projetonotafiscal.notafiscal.Entity;

import br.com.projetonotafiscal.notafiscal.DTO.DadosAtualizaCliente;
import br.com.projetonotafiscal.notafiscal.DTO.DadosCadastroCliente;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "Cliente")
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long codigo_cliente;
    private String nome;

    public Cliente() {}

    public Cliente(DadosCadastroCliente dto) {
        this.nome = dto.getNome();
    }

    public Cliente(String nome, Long codigoCliente) {
    }

    public Long getId() {
        return id;
    }

    public Long getCodigoCliente() {
        return codigo_cliente;
    }

    public String getNome() {
        return nome;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCodigoCliente(Long codigoCliente) {
        this.codigo_cliente = codigoCliente;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "nome='" + nome + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cliente cliente = (Cliente) o;
        return Objects.equals(id, cliente.id) && Objects.equals(codigo_cliente, cliente.codigo_cliente) && Objects.equals(nome, cliente.nome);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, codigo_cliente, nome);
    }

    public void atualizar(DadosAtualizaCliente dto) {
        if (dto.getNome() != null) {
            this.nome = dto.getNome();
        }
    }

}
