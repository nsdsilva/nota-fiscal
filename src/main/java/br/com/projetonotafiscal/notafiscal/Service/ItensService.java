package br.com.projetonotafiscal.notafiscal.Service;

import br.com.projetonotafiscal.notafiscal.DTO.ItensDTO;
import br.com.projetonotafiscal.notafiscal.Entity.Itens;
import br.com.projetonotafiscal.notafiscal.Entity.Produto;
import br.com.projetonotafiscal.notafiscal.Infra.ValidacaoException;
import br.com.projetonotafiscal.notafiscal.Repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ItensService {

    @Autowired
    private ProdutoRepository repository;

    public Itens lista(ItensDTO dto) {
        Itens itens = new Itens(dto);

        if (!repository.existsById(dto.getProduto())) {
            throw new ValidacaoException("O produto não existe.");
        }

        if (dto.getProduto() == null) {
            throw new ValidacaoException("É obrigatório adicionar um produto.");
        }

        Produto produto = repository.getReferenceById(dto.getProduto());
        BigDecimal qtde = dto.getQuantidade();
        BigDecimal valorProduto = repository.getByValorUnitarioProduto(dto.getProduto());
        BigDecimal valorTotal = valorProduto.multiply(qtde);
        int ordenacao = 0;



        return itens;
    }
}
