package br.com.projetonotafiscal.notafiscal.Repository;

import br.com.projetonotafiscal.notafiscal.Entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    @Query("SELECT MAX(id) FROM Produto")
    Long findTopByOrderByIdDesc();

    @Query("SELECT valor_unitario FROM Produto WHERE id = :id")
    Produto findByValorUnitarioProduto(Long id);
}
