SELECT YEAR(venda.data) as Ano, produto.descricao as Descrição, SUM(vendaitem.quantidade) as Quantidade
FROM vendaitem

INNER JOIN produto
ON vendaitem.idProduto = produto.id

INNER JOIN venda
ON vendaitem.idVenda = venda.id

WHERE idVenda IN 
	(SELECT id FROM venda WHERE year(data) BETWEEN year('2015-01-01') AND year('2022-01-01')) AND
	idProduto=(SELECT id FROM produto WHERE descricao='Laranja')

GROUP BY YEAR(venda.data);

