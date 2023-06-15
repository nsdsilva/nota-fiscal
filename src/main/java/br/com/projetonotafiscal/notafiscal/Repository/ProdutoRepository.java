package br.com.projetonotafiscal.notafiscal.Repository;

import br.com.projetonotafiscal.notafiscal.Entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    @Query("SELECT MAX(id) FROM Produto")
    Long findTopByOrderByIdDesc();

    @Query("SELECT p.VALOR_UNITARIO FROM Produto p WHERE p.id = :id")
    double getByValorUnitarioProduto(Long id);
}
