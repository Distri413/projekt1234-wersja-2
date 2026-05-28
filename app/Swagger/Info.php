<?php

namespace App\Swagger;

/**
 * @OA\Info(
 *     title="Users CRUD API",
 *     version="1.0.0",
 *     description="REST API do zarządzania użytkownikami (CRUD + role)"
 * )
 *
 * @OA\Server(
 *     url="http://127.0.0.1:8000",
 *     description="Local server"
 * )
 */

/**
 * @OA\Get(
 *     path="/api/users",
 *     tags={"Users"},
 *     summary="Pobierz wszystkich użytkowników",
 *     @OA\Response(
 *         response=200,
 *         description="Lista użytkowników",
 *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/User"))
 *     )
 * )
 */

/**
 * @OA\Post(
 *     path="/api/users",
 *     tags={"Users"},
 *     summary="Dodaj użytkownika",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name","email","password"},
 *             @OA\Property(property="name", type="string", example="Jan"),
 *             @OA\Property(property="surname", type="string", example="Kowalski"),
 *             @OA\Property(property="email", type="string", example="test@email.com"),
 *             @OA\Property(property="password", type="string", example="123456")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Utworzono użytkownika"
 *     )
 * )
 */

/**
 * @OA\Delete(
 *     path="/api/users/{id}",
 *     tags={"Users"},
 *     summary="Usuń użytkownika",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Usunięto użytkownika"
 *     )
 * )
 */

/**
 * @OA\Put(
 *     path="/api/users/{id}",
 *     tags={"Users"},
 *     summary="Edytuj użytkownika",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer")
 *     ),
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             @OA\Property(property="name", type="string"),
 *             @OA\Property(property="email", type="string")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Zaktualizowano użytkownika"
 *     )
 * )
 */
class Info {}