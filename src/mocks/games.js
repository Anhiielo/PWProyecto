/* 
 * NOTA PARA EL FUTURO (ESCALABILIDAD):
 * Actualmente esta lista de juegos está "hardcodeada" (escrita manualmente en el código).
 * Para un proyecto real a futuro, lo ideal es implementar una base de datos (como PostgreSQL, MongoDB o Firebase) 
 * y un backend (Node.js/Express, Python/Django, etc.) que sirva estos datos a través de una API REST o GraphQL.
 * Esto permitirá:
 * - Añadir/editar juegos desde un panel de administrador sin tocar el código.
 * - Gestionar stock, ofertas y precios dinámicamente.
 * - Mejorar la seguridad de las transacciones.
 */

export const gamesMock = [
    { id: 1, title: "Elden Ring", price: 150.00, platform: "PC", category: "RPG" },
    { id: 2, title: "EA Sports FC 24", price: 199.90, platform: "PS5", category: "Deportes" },
    { id: 3, title: "Cyberpunk 2077", price: 120.50, platform: "PC", category: "Acción" },
    { id: 4, title: "Zelda: Tears of the Kingdom", price: 220.00, platform: "Switch", category: "Aventura" },
    { id: 5, title: "Hollow Knight", price: 45.00, platform: "PC", category: "Indie" },
    { id: 6, title: "God of War Ragnarök", price: 250.00, platform: "PS5", category: "Acción" },
    { id: 7, title: "Super Mario Bros. Wonder", price: 210.00, platform: "Switch", category: "Plataformas" },
    { id: 8, title: "Halo Infinite", price: 160.00, platform: "Xbox", category: "Shooter" },
    { id: 9, title: "Forza Horizon 5", price: 180.00, platform: "Xbox", category: "Carreras" },
    { id: 10, title: "Animal Crossing: New Horizons", price: 190.00, platform: "Switch", category: "Simulación" },
    { id: 11, title: "Red Dead Redemption 2", price: 90.00, platform: "PC", category: "Acción" },
    { id: 12, title: "Spider-Man 2", price: 260.00, platform: "PS5", category: "Acción" }
  ];