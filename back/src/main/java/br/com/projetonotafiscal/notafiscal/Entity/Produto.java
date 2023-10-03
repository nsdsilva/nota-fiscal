package br.com.projetonotafiscal.notafiscal.Entity;

import br.com.projetonotafiscal.notafiscal.DTO.ClienteDTO;
import br.com.projetonotafiscal.notafiscal.DTO.ProdutoDTO;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@Entity(name = "Produto")
@Table(name = "produto")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    private String descricao;
    private BigDecimal valor_unitario;

    public Produto() {}

    public Produto(int id) {
        this.id = Long.valueOf(id);
    }

    public Produto(ProdutoDTO dto) {
        this.id = dto.getId();
        this.codigo = dto.getCodigo();
        this.descricao = dto.getDescricao();
        this.valor_unitario = dto.getValor_unitario();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
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

    public void atualizar(ProdutoDTO dto) {
        if (dto.getDescricao() != null) {
            this.descricao = dto.getDescricao();
        }

        if (dto.getValor_unitario() != null) {
            this.valor_unitario = dto.getValor_unitario();
        }

        if (dto.getCodigo() != null) {
            this.codigo = dto.getCodigo();
        }
    }
}
