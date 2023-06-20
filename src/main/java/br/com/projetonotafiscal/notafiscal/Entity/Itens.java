package br.com.projetonotafiscal.notafiscal.Entity;

import br.com.projetonotafiscal.notafiscal.DTO.ItensDTO;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Entity(name = "Itens")
@Table(name = "itens")
public class Itens {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_produto")
    private Produto produto;

    @ManyToMany(mappedBy = "itens")
    private List<Nota> notas;
    private int ordenacao;
    private int quantidade;
    private BigDecimal valor_total;


    public Itens(ItensDTO dto) {
        this.ordenacao = dto.getOrdenacao();
        this.produto = dto.getProduto();
        this.quantidade = dto.getQuantidade();
        this.valor_total = dto.getValor_total();
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

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public List<Nota> getNotas() {
        return notas;
    }

    public void setNotas(List<Nota> notas) {
        this.notas = notas;
    }

    public BigDecimal getValor_total() {
        return valor_total;
    }

    public void setValor_total(BigDecimal valor_total) {
        this.valor_total = valor_total;
    }
}
