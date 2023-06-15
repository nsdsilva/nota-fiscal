package br.com.projetonotafiscal.notafiscal.Entity;

import br.com.projetonotafiscal.notafiscal.DTO.DadosAtualizaProduto;
import br.com.projetonotafiscal.notafiscal.DTO.DadosCadastroProduto;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "Produto")
@Table(name = "produto")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long codigo;
    private String descricao;
    private double valor_unitario;

    public Produto() {}

    public Produto(DadosCadastroProduto dto) {
        this.codigo = dto.getCodigo();
        this.descricao = dto.getDescricao();
        this.valor_unitario = dto.getValor_unitario();
    }


    public Long getId() {
        return id;
    }

    public Long getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public double getValor_unitario() {
        return valor_unitario;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setValor_unitario(double valor_unitario) {
        this.valor_unitario = valor_unitario;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Produto produto = (Produto) o;
        return Double.compare(produto.valor_unitario, valor_unitario) == 0 && Objects.equals(id, produto.id) && Objects.equals(codigo, produto.codigo) && Objects.equals(descricao, produto.descricao);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, codigo, descricao, valor_unitario);
    }

    @Override
    public String toString() {
        return "Produto{" +
                "id=" + id +
                ", codigo=" + codigo +
                ", descricao='" + descricao + '\'' +
                ", valor_unitario=" + valor_unitario +
                '}';
    }

    public void atualizar(DadosAtualizaProduto dto) {
        if (dto.getDescricao() != null) {
            this.descricao = dto.getDescricao();
        }

        if (dto.getValor_unitario() != 0) {
            this.valor_unitario = dto.getValor_unitario();
        }
    }
}
