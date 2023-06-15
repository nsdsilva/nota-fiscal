package br.com.projetonotafiscal.notafiscal.DTO;

import br.com.projetonotafiscal.notafiscal.Entity.Cliente;
import br.com.projetonotafiscal.notafiscal.Entity.Produto;

public class DadosAtualizaProduto {

    private Long id;
    private String descricao;
    private double valor_unitario;

    public DadosAtualizaProduto() {}

    public DadosAtualizaProduto(Produto produto) {
        this.id = produto.getId();
        this.descricao = produto.getDescricao();
        this.valor_unitario = produto.getValor_unitario();
    }

    public Long getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public double getValor_unitario() {
        return valor_unitario;
    }
}
