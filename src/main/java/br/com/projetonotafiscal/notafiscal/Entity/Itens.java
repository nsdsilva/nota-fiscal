package br.com.projetonotafiscal.notafiscal.Entity;

import br.com.projetonotafiscal.notafiscal.DTO.ItensDTO;

import javax.persistence.*;
import java.util.Objects;

@Entity(name = "Itens")
@Table(name = "itens")
public class Itens {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int ordenacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_produto")
    private Produto produto;
    private int quantidade;
    private double valor_total;


    public Itens(ItensDTO dto) {
        this.ordenacao = dto.getOrdenacao();
       // this.produto = dto.getProduto();
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

    public double getValor_total() {
        return valor_total;
    }

    public void setValor_total(double valor_total) {
        this.valor_total = valor_total;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Itens itens = (Itens) o;
        return ordenacao == itens.ordenacao && quantidade == itens.quantidade && Double.compare(itens.valor_total, valor_total) == 0 && Objects.equals(id, itens.id) && Objects.equals(produto, itens.produto);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, ordenacao, produto, quantidade, valor_total);
    }

    @Override
    public String toString() {
        return "Itens{" +
                "id=" + id +
                ", ordenacao=" + ordenacao +
                ", produto=" + produto +
                ", quantidade=" + quantidade +
                ", valor_total=" + valor_total +
                '}';
    }
}
