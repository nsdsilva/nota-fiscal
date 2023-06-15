package br.com.projetonotafiscal.notafiscal.Service;

import br.com.projetonotafiscal.notafiscal.DTO.DadosAtualizaCliente;
import br.com.projetonotafiscal.notafiscal.DTO.DadosCadastroCliente;
import br.com.projetonotafiscal.notafiscal.DTO.DadosListagemCliente;
import br.com.projetonotafiscal.notafiscal.Entity.Cliente;
import br.com.projetonotafiscal.notafiscal.Infra.ValidacaoException;
import br.com.projetonotafiscal.notafiscal.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;


    //método para salvar o cliente no banco de dados
    public DadosListagemCliente salvar(DadosCadastroCliente dto) {
      Cliente cliente = new Cliente(dto);

      if (dto.getNome() != null) {
          throw new ValidacaoException("É necessário informar o nome do cliente.");
      }

      Long ultimoCliente = repository.findTopByOrderByIdDesc();

      if (ultimoCliente != null) {
          cliente.setCodigoCliente(ultimoCliente + 1);
      } else {
          cliente.setCodigoCliente(1L);
      }

      repository.save(cliente);

      return new DadosListagemCliente(cliente);
    }


    //método para atualizar informações do cliente
    public DadosListagemCliente atualizar(DadosAtualizaCliente dto) {
        Cliente cliente = repository.getReferenceById(dto.getId());
        cliente.atualizar(dto);

        return new DadosListagemCliente(cliente);
    }


    //método para listar todos os clientes
    public Page<DadosListagemCliente> listarTodos(Pageable paginacao) {
        Page page = repository.findAll(paginacao).map(DadosListagemCliente :: new);

        return page;
    }


    //método para listar o cliente de acordo com o seu ID
    public DadosListagemCliente detalhar(Long id) {
        Cliente cliente = repository.getReferenceById(id);

        return new DadosListagemCliente(cliente);
    }


    //método para excluir o cliente de acordo com o ID
    public void excluir(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        }
    }
}
