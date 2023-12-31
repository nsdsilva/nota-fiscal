package br.com.projetonotafiscal.notafiscal.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Entity(name = "Itens")
@Table(name = "itens")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Itens {

    @Id
    @JsonProperty("id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_produto")
    private Produto produto;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("itens")
    private Nota nota;
    private Integer ordenacao;
    private BigDecimal quantidade;
    private BigDecimal valor_total;


    public Itens() {}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrdenacao() {
        return ordenacao;
    }

    public void setOrdenacao(Integer ordenacao) {
        this.ordenacao = ordenacao;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public BigDecimal getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(BigDecimal quantidade) {
        this.quantidade = quantidade;
    }

    public Nota getNota() {
        return nota;
    }

    public void setNota(Nota nota) {
        this.nota = nota;
    }

    public BigDecimal getValor_total() {
        return valor_total;
    }

    public void setValor_total(BigDecimal valor_total) {
        this.valor_total = valor_total;
    }

    public boolean equals(Object obj) {
        Itens comparacao = (Itens) obj;
        if (this.id != comparacao.getId()) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getProduto(), getNota(), getOrdenacao(), getQuantidade(), getValor_total());
    }
}
