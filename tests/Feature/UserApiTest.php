<?php

namespace Tests\Feature; 

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class UserApiTest extends TestCase 
{
    use RefreshDatabase;

    #[Test]
    public function mozna_pobrac_liste_uzytkownikow()
    {
        User::factory()->count(3)->create(['surname' => 'Kowalski']);

        $response = $this->getJson('/api/users');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
    }

    #[Test]
    public function mozna_dodac_nowego_uzytkownika()
    {
        $userData = [
            'name' => 'Jan',
            'surname' => 'Kowalski',
            'email' => 'jan.kowalski@example.com',
            'password' => 'secret123'
        ];

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'email' => 'jan.kowalski@example.com',
            'name' => 'Jan'
        ]);
    }

    #[Test]
    public function nie_mozna_dodac_uzytkownika_z_istniejacym_emailem()
    {
        User::factory()->create(['email' => 'zajety@example.com', 'surname' => 'Nowak']);

        $userData = [
            'name' => 'Tomasz',
            'surname' => 'Nowak',
            'email' => 'zajety@example.com',
            'password' => 'password123'
        ];

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    #[Test]
    public function mozna_edytowac_uzytkownika()
    {
        $user = User::factory()->create([
            'name' => 'Stare Imie',
            'surname' => 'Stare Nazwisko',
            'email' => 'stary@example.com'
        ]);

        $updatedData = [
            'name' => 'Nowe Imie',
            'surname' => 'Nowe Nazwisko',
            'email' => 'stary@example.com'
        ];

        $response = $this->putJson("/api/users/{$user->id}", $updatedData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Nowe Imie'
        ]);
    }

    #[Test]
    public function mozna_usunac_uzytkownika()
    {
        $user = User::factory()->create(['surname' => 'Kowalski']);

        $response = $this->deleteJson("/api/users/{$user->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('users', [
            'id' => $user->id
        ]);
    }
}