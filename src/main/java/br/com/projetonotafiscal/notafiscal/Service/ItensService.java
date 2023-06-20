package br.com.projetonotafiscal.notafiscal.Service;

import br.com.projetonotafiscal.notafiscal.DTO.ItensDTO;
import br.com.projetonotafiscal.notafiscal.Entity.Itens;
import br.com.projetonotafiscal.notafiscal.Entity.Produto;
import br.com.projetonotafiscal.notafiscal.Infra.ValidacaoException;
import br.com.projetonotafiscal.notafiscal.Repository.ItensRepository;
import br.com.projetonotafiscal.notafiscal.Repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ItensService {

    @Autowired
    private ItensRepository repository;

    @Autowired
    private ProdutoRepository produtoRepository;


    public Itens salvar(ItensDTO dto) {
        Itens itens = new Itens(dto);

        if(dto.getProduto() == null) {
            throw new ValidacaoException("É necessário adicionar pelo menos um produto.");
        }

        if (!produtoRepository.existsById(dto.getProduto())) {
            throw new ValidacaoException("O produto não existe.");
        }

        if (dto.getQuantidade() == 0) {
            throw new ValidacaoException("É necessário adicionar a quantidade ao produto.");
        }

        Produto produto = new Produto();
        produto = produtoRepository.getReferenceById(dto.getProduto());

        List<Itens> itensList = new ArrayList<>();
        int quantidade = dto.getQuantidade();
        BigDecimal valorUnitario = produtoRepository.getByValorUnitarioProduto(dto.getProduto());
       // BigDecimal valorTotal = valorUnitario * quantidade;
        int ordenacao = 0;

        for (int i =0; i < itensList.size(); i++) {
            if (itensList.isEmpty()) {
                ordenacao = 1;

            }
        }
        return itens;
    }

}
