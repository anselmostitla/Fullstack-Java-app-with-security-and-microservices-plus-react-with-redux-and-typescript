package com.qwe.taskusermicroservice.config;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

// READING 2

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig{

   @Bean
   SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
      return httpSecurity
              .csrf(csrf -> csrf.disable())
              .cors(cors -> cors.configurationSource(corsConfigurationSource()))
              .httpBasic(Customizer.withDefaults())
//              .formLogin(Customizer.withDefaults())
              .authorizeHttpRequests(authorizeHttpRequests ->
                      authorizeHttpRequests
                              .requestMatchers("/api/**").permitAll()
                              .anyRequest().authenticated()
              )
              .sessionManagement(management -> management.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS
                      )
              )
              .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
              .build();
   }

   private CorsConfigurationSource corsConfigurationSource() {
      return new CorsConfigurationSource() {
         @Override
         public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
            CorsConfiguration corsConfiguration = new CorsConfiguration();

            // corsConfiguration.setAllowedOrigins(Collections.singletonList(""));
            corsConfiguration.setAllowedOrigins(Arrays.asList(
               "http://localhost:5173",
               "https://securitz6.vercel.app/"
            ));
            corsConfiguration.setAllowedMethods(Collections.singletonList("*"));
            corsConfiguration.setAllowCredentials(true);
            corsConfiguration.setAllowedHeaders(Collections.singletonList("*"));
            corsConfiguration.setExposedHeaders(Arrays.asList("Authorization"));
            corsConfiguration.setMaxAge(3600L);


            return corsConfiguration;
         }
      };
   }

   @Bean
   public PasswordEncoder passwordEncoder(){
      return new BCryptPasswordEncoder();
   }
}
