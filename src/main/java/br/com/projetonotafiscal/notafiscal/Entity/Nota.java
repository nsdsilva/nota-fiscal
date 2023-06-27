package br.com.projetonotafiscal.notafiscal.Entity;

import br.com.projetonotafiscal.notafiscal.DTO.ClienteDTO;
import br.com.projetonotafiscal.notafiscal.DTO.NotaDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity(name = "Nota")
@Table(name = "nota")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "nota", cascade = CascadeType.ALL)
    private List<Itens> itens;

    private Integer numero;
    private Date data;
    private BigDecimal valor_total;

    public Nota() {}

    public Nota(int id) {
        this.id = Long.valueOf(id);
    }

    public Nota(NotaDTO dto) {
        this.id = dto.getId();
        this.cliente = dto.getCliente();
        this.itens = dto.getItens();
        this.data = dto.getData();
        this.valor_total = dto.getValor_total();
        this.numero = dto.getNumero();
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

    public BigDecimal getValor_total() {
        return valor_total;
    }

    public void setValor_total(BigDecimal valor_total) {
        this.valor_total = valor_total;
    }

    public Integer getNumero() {
        return numero;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public void atualizar(NotaDTO dto) {
        if (dto.getCliente() != null) {
            this.cliente = new Cliente(new ClienteDTO());
        }
        if (dto.getItens() != null) {
            this.itens = dto.getItens();
        }
        if (dto.getData() != null) {
            this.data = dto.getData();
        }
    }
}
