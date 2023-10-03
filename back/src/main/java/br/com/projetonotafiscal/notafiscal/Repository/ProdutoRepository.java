package br.com.projetonotafiscal.notafiscal.Repository;

import br.com.projetonotafiscal.notafiscal.Entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    @Query("SELECT MAX(id) FROM Produto")
    Long findTopByOrderByIdDesc();

    @Query("SELECT valor_unitario FROM Produto WHERE id = :id")
    Long findByValorUnitarioProduto(Long id);

    @Query("SELECT p FROM Produto p WHERE p.descricao LIKE :descricao")
    List<Produto> findNomeLike(String descricao);
}
