package br.com.projetonotafiscal.notafiscal.DTO;

import br.com.projetonotafiscal.notafiscal.Entity.Produto;

import java.math.BigDecimal;

public class ProdutoDTO {

    private Long id;
    private Long codigo;
    private String descricao;
    private BigDecimal valor_unitario;

    public ProdutoDTO() {}


    public ProdutoDTO(Produto produto) {
        this.id = produto.getId();
        this.codigo = produto.getCodigo();
        this.descricao = produto.getDescricao();
        this.valor_unitario = produto.getValor_unitario();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCodigo() {
        return codigo;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getValor_unitario() {
        return valor_unitario;
    }

    public void setValor_unitario(BigDecimal valor_unitario) {
        this.valor_unitario = valor_unitario;
    }
}
