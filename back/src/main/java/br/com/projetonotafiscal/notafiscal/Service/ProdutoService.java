package br.com.projetonotafiscal.notafiscal.Service;

import br.com.projetonotafiscal.notafiscal.DTO.*;
import br.com.projetonotafiscal.notafiscal.Entity.Produto;
import br.com.projetonotafiscal.notafiscal.Infra.ValidacaoException;
import br.com.projetonotafiscal.notafiscal.Repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;


    //método para salvar produto
    public Produto salvar(ProdutoDTO dto) {
        Produto produto = new Produto(dto);

        if (dto.getDescricao() == null) {
            throw new ValidacaoException("É necessário informar uma descrição para o produto.");
        }

        if (dto.getValor_unitario() == null) {
            throw new ValidacaoException("É necessário informar um valor para o produto.");
        }

        //String codigoAleatorio = UUID.randomUUID().toString();
        Random random = new Random();
        int numeroAleatorio = random.nextInt();
        String codigoAleatorio = String.valueOf(numeroAleatorio);

        if( dto.getCodigo() != null) {
            produto.setCodigo(dto.getCodigo());
        } else {
            produto.setCodigo(codigoAleatorio);
        }
        produto = repository.save(produto);

        return produto;
    }


    //método para atualizar produto
    public void atualizar(ProdutoDTO dto) {
        Produto produto = repository.getReferenceById(dto.getId());
        produto.atualizar(dto);
    }


    //método para listar todos os produtos
    public List<Produto> listarTodos() {
        List<Produto> produtos = repository.findAll();

        return produtos;
    }


    //método para listar o produto de acordo com o seu ID
    public Produto detalhar(Long id) {
        Produto produto = repository.getReferenceById(id);

        return produto;
    }

    public List<Produto> buscaLike(String descricao) {
        List<Produto> produto = repository.findNomeLike("%" + descricao + "%");

        return produto;
    }


    //método para excluir o produto de acordo com o ID
    public void excluir(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        }
    }
}
