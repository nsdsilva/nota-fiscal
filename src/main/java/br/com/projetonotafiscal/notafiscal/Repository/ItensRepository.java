package br.com.projetonotafiscal.notafiscal.Repository;

import br.com.projetonotafiscal.notafiscal.Entity.Itens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface ItensRepository extends JpaRepository<Itens, Long> {

    @Query("SELECT MAX(ordenacao) FROM Itens WHERE nota = :nota")
    Integer findByOrdenacao(Long nota);
}
