package com.healthsphere.health.service;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.healthsphere.health.entity.Patients;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtUtilService {
	
	@Value("${jwt.secret}")
	private String secret;
	
	public String generateToken(Patients patient) {
		return Jwts.builder()
				.subject(patient.getUsername())
				.claim("id", patient.getId())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000))
				.signWith(getSignInKey())
				.compact();
	}
	
	private SecretKey getSignInKey() {
		byte[] keyBytes = Decoders.BASE64URL.decode(secret);
		return Keys.hmacShaKeyFor(keyBytes);	
	}
	
	public <T> T extractClaim(String token, Function<Claims, T> resolver) {
		Claims claims = extractAllClaims(token);
		return resolver.apply(claims);
	}
	
	private Claims extractAllClaims(String token) {
		return Jwts
				.parser()
				.verifyWith(getSignInKey())
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}
	
	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}
	
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}
	
//	public String extractUsertype(String token) {
//		return extractClaim(token, claims -> claims.get("usertype", String.class));
//	}
	
	private boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}
	
	public boolean isTokenValid(String token, UserDetails user) {
		String username = extractUsername(token);
		return (username.equals(user.getUsername()) && !isTokenExpired(token));
	}
	
}
