package br.com.projetonotafiscal.notafiscal.Service;

import br.com.projetonotafiscal.notafiscal.DTO.ItensDTO;
import br.com.projetonotafiscal.notafiscal.Entity.Itens;
import br.com.projetonotafiscal.notafiscal.Entity.Produto;
import br.com.projetonotafiscal.notafiscal.Infra.ValidacaoException;
import br.com.projetonotafiscal.notafiscal.Repository.ItensRepository;
import br.com.projetonotafiscal.notafiscal.Repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ItensService {

    @Autowired
    private ItensRepository repository;

    @Autowired
    private ProdutoRepository produtoRepository;


    public void salvar(ItensDTO dto) {
        Itens itens = new Itens(dto);

        if (!produtoRepository.existsById(dto.getProduto())) {
            throw new ValidacaoException("Produto escolhido não existe.");
        }
        if (dto.getQuantidade() == 0) {
            throw new ValidacaoException("É necessário informar a quantidade.");
        }

        //Criando lista para pegar o valor do produto adicionado e somar o valor unitário;
        List<Double> valor = new ArrayList<>();
        double soma = 0;
        double valorTotal = 0;
        int quantidade = dto.getQuantidade();
        //double valorProduto = produtoRepository.getByValorUnitarioProduto(dto.getProduto());

        //valorTotal = quantidade * valorProduto;
        valor.add(valorTotal);

        for (int i = 0; i < valor.size(); i++) {
            soma += valor.get(i);
        }



        Produto produto = produtoRepository.getReferenceById(dto.getProduto());
    }


}
