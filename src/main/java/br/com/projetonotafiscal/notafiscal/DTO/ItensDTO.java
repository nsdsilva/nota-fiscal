package br.com.projetonotafiscal.notafiscal.DTO;

import br.com.projetonotafiscal.notafiscal.Entity.Itens;
import br.com.projetonotafiscal.notafiscal.Entity.Produto;

import javax.persistence.*;

public class ItensDTO {

    private Long id;
    private int ordenacao;
    private Long produto;
    private int quantidade;
    private double valor_total;

    public ItensDTO() {}

    public ItensDTO(Itens itens) {
        this.id = itens.getId();
        this.ordenacao = itens.getOrdenacao();
        //this.produto = new Itens(itens.getProduto());
        this.quantidade = itens.getQuantidade();
        this.valor_total = itens.getValor_total();
    }

    public Long getId() {
        return id;
    }

    public int getOrdenacao() {
        return ordenacao;
    }

    public Long getProduto() {
        return produto;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public double getValor_total() {
        return valor_total;
    }
}
