package br.com.projetonotafiscal.notafiscal.DTO;

import br.com.projetonotafiscal.notafiscal.Entity.Itens;
import br.com.projetonotafiscal.notafiscal.Entity.Produto;

import javax.persistence.*;
import java.math.BigDecimal;

public class ItensDTO {

    private Long id;
    private int ordenacao;
    private Long produto;
    private int quantidade;
    private BigDecimal valor_total;

    public ItensDTO() {}

    public ItensDTO(Itens itens) {
        this.id = itens.getId();
        this.ordenacao = itens.getOrdenacao();
        this.produto = new Produto(itens.getProduto());
        this.quantidade = itens.getQuantidade();
        this.valor_total = itens.getValor_total();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getOrdenacao() {
        return ordenacao;
    }

    public void setOrdenacao(int ordenacao) {
        this.ordenacao = ordenacao;
    }

    public Long getProduto() {
        return produto;
    }

    public void setProduto(Long produto) {
        this.produto = produto;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public BigDecimal getValor_total() {
        return valor_total;
    }

    public void setValor_total(BigDecimal valor_total) {
        this.valor_total = valor_total;
    }
}
