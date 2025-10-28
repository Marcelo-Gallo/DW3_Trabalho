-- ** Tabela: CLIENTES **
-- Representa os clientes da nossa empresa (aqueles que nos devem).
CREATE TABLE IF NOT EXISTS CLIENTES (
    ID SERIAL PRIMARY KEY,              -- Chave Primária, auto-incrementável
    NOME VARCHAR(255) NOT NULL,         -- Nome do cliente (TEXTO, Obrigatório)
    CNPJ VARCHAR(18) UNIQUE,            -- CNPJ do cliente (TEXTO, Opcional, Único)
    DATACADASTRO DATE NOT NULL DEFAULT CURRENT_DATE, -- Data de cadastro (DATA, Obrigatório, Padrão: data atual)
    LIMITECREDITO NUMERIC(10, 2) NOT NULL DEFAULT 0.00, -- Limite de crédito (DECIMAL, Obrigatório, Padrão: 0.00)
    REMOVIDO BOOLEAN NOT NULL DEFAULT FALSE -- Soft delete (BOOLEANO, Obrigatório, Padrão: FALSE)
);

-- ** Tabela: CONTAS_RECEBER **
-- Representa as contas que a nossa empresa tem a receber dos clientes.
CREATE TABLE IF NOT EXISTS CONTAS_RECEBER (
    ID SERIAL PRIMARY KEY,              -- Chave Primária, auto-incrementável
    DESCRICAO VARCHAR(255) NOT NULL,    -- Descrição da conta (TEXTO, Obrigatório)
    VALOR NUMERIC(10, 2) NOT NULL,      -- Valor a receber (DECIMAL, Obrigatório)
    DATAVENCIMENTO DATE NOT NULL,       -- Data de vencimento (DATA, Obrigatório)
    REMOVIDO BOOLEAN NOT NULL DEFAULT FALSE, -- Soft delete (BOOLEANO, Obrigatório, Padrão: FALSE)
    
    -- Chave Estrangeira para CLIENTES
    ID_CLIENTE INTEGER NOT NULL,
    CONSTRAINT FK_CLIENTE
        FOREIGN KEY (ID_CLIENTE)
        REFERENCES CLIENTES (ID)
        ON DELETE RESTRICT -- Impede a exclusão de um cliente se ele tiver contas a receber ativas
);

-- ** Índices para otimização **
CREATE INDEX IF NOT EXISTS IDX_CLIENTES_NOME ON CLIENTES (NOME);
CREATE INDEX IF NOT EXISTS IDX_CONTAS_RECEBER_IDCLIENTE ON CONTAS_RECEBER (ID_CLIENTE);
CREATE INDEX IF NOT EXISTS IDX_CONTAS_RECEBER_DATAVENCIMENTO ON CONTAS_RECEBER (DATAVENCIMENTO);

-- ** Dados de Teste **
INSERT INTO CLIENTES (NOME, CNPJ, DATACADASTRO, LIMITECREDITO) VALUES
('Empresa Exemplo Ltda', '11.222.333/0001-44', '2023-01-10', 10000.00),
('Comércio do João S.A.', '44.555.666/0001-77', '2023-03-22', 5000.00);

INSERT INTO CONTAS_RECEBER (DESCRICAO, VALOR, DATAVENCIMENTO, ID_CLIENTE) VALUES
('Venda NF 001/2024', 1250.75, '2024-05-30', (SELECT ID FROM CLIENTES WHERE NOME = 'Empresa Exemplo Ltda')),
('Serviço de Consultoria', 500.00, '2024-06-15', (SELECT ID FROM CLIENTES WHERE NOME = 'Empresa Exemplo Ltda')),
('Venda de Produtos Diversos', 320.00, '2024-06-01', (SELECT ID FROM CLIENTES WHERE NOME = 'Comércio do João S.A.'));