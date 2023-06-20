package br.com.projetonotafiscal.notafiscal.Entity;

import br.com.projetonotafiscal.notafiscal.DTO.NotaDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
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

    @ManyToMany
    @JoinTable(name = "notas_itens",
            joinColumns = @JoinColumn(name = "id_nota"),
            inverseJoinColumns = @JoinColumn(name = "id_item"))
    private List<Itens> itens;

    private String numero;
    private LocalDate data;
    private BigDecimal valor_total;


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

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public BigDecimal getValor_total() {
        return valor_total;
    }

    public void setValor_total(BigDecimal valor_total) {
        this.valor_total = valor_total;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }
}
