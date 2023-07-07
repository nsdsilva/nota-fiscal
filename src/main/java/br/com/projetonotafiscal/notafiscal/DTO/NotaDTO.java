package br.com.projetonotafiscal.notafiscal.DTO;

import br.com.projetonotafiscal.notafiscal.Entity.Cliente;
import br.com.projetonotafiscal.notafiscal.Entity.Itens;
import br.com.projetonotafiscal.notafiscal.Entity.Nota;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Objects;

public class NotaDTO {


    private Long id;
    private Cliente cliente;
    private List<Itens> itens;
    private Date data;
    private BigDecimal valor_total;
    private Integer numero;

    public NotaDTO() {}

    public NotaDTO(Nota nota) {
        this.id = nota.getId();
        this.cliente = nota.getCliente();
        this.itens = nota.getItens();
        this.data = nota.getData();
        this.valor_total = nota.getValor_total();
        this.numero = nota.getNumero();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<Itens> getItens() {
        return itens;
    }

    public void setItens(List<Itens> itens) {
        this.itens = itens;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public Integer getNumero() {
        return numero;
    }

    public BigDecimal getValor_total() {
        return valor_total;
    }

    public void setValor_total(BigDecimal valor_total) {
        this.valor_total = valor_total;
    }

    @Override
    public boolean equals(Object o) {
        NotaDTO itens = (NotaDTO) o;
        if (this.itens == itens.getItens()) return true;
        return false;
    }
}
