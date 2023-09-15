package br.com.projetonotafiscal.notafiscal.Repository;

import br.com.projetonotafiscal.notafiscal.Entity.Itens;
import br.com.projetonotafiscal.notafiscal.Entity.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface ItensRepository extends JpaRepository<Itens, Long> {

    @Query("select i from Itens i where nota = :id")
    List<Itens> findAllByIdItens(Nota id);

    @Query("select max(ordenacao) from Itens where nota = :id")
    Integer findByUltimaOrdencao(Nota id);

}
