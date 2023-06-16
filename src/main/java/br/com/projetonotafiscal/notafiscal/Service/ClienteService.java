package br.com.projetonotafiscal.notafiscal.Service;

import br.com.projetonotafiscal.notafiscal.DTO.ClienteDTO;
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
    public Cliente salvar(ClienteDTO dto) {
      Cliente cliente = new Cliente(dto);

      if (dto.getNome() != null) {
          throw new ValidacaoException("É necessário informar o nome do cliente.");
      }
//      Long ultimoCliente = repository.findTopByOrderByIdDesc();
//      if (ultimoCliente != null) {
//          cliente.setCodigoCliente(ultimoCliente + 1);
//      } else {
//          cliente.setCodigoCliente(1L);
//      }

      cliente = repository.save(cliente);

      return cliente;
    }


    //método para atualizar informações do cliente
    public void atualizar(ClienteDTO dto) {
        Cliente cliente = repository.getReferenceById(dto.getId());
        cliente.atualizar(dto);
    }


    //método para listar todos os clientes
    public Page<ClienteDTO> listarTodos(Pageable paginacao) {
        Page page = repository.findAll(paginacao).map(ClienteDTO :: new);

        return page;
    }


    //método para listar o cliente de acordo com o seu ID
    public Cliente detalhar(Long id) {
        Cliente cliente = repository.getReferenceById(id);

        return cliente;
    }


    //método para excluir o cliente de acordo com o ID
    public void excluir(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        }
    }
}
