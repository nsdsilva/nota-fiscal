package br.com.projetonotafiscal.notafiscal.DTO;

import br.com.projetonotafiscal.notafiscal.Entity.Produto;

import java.util.List;
import java.util.stream.Collectors;

public class DadosListagemProduto {

    private Long id;
    private Long codigo;
    private String descricao;
    private double valor_unitario;

    public DadosListagemProduto(Produto produto) {
        this.id = produto.getId();
        this.codigo = produto.getCodigo();
        this.descricao = produto.getDescricao();
        this.valor_unitario = produto.getValor_unitario();
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
}
