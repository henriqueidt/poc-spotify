package com.poc.spotify.controllers;

import java.io.InputStream;
import java.util.List;

import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin
@RestController
public class MusicController {
	
	@GetMapping("/music")
	public ResponseEntity<InputStreamResource> streamMusic(HttpServletRequest request) throws Exception {
		InputStream inputStream = getClass().getResourceAsStream("music.mp3");
		InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
		
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=music.mp3");
	    headers.add(HttpHeaders.CONTENT_TYPE, "audio/mpeg");
	    headers.add(HttpHeaders.CONTENT_LENGTH, String.valueOf(inputStream.available()));
		return ResponseEntity.ok()
				.headers(headers)
				.body(inputStreamResource);
				
	}
	
//	private ResourceLoader resourceLoader = new DefaultResourceLoader();
//
//	@GetMapping("/music")
//	public ResponseEntity<ResourceRegion> streamMusic(HttpServletRequest request) throws Exception {
//		Resource musicResource = resourceLoader.getResource("classpath:com/poc/spotify/controllers/music.mp3");
//		ResourceRegion musicRegion = getResourceRegion(request, musicResource);
//		return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
//				.contentType(MediaType.APPLICATION_OCTET_STREAM)
//				.body(musicRegion);
//				
//	}
//	
//	private ResourceRegion getResourceRegion(HttpServletRequest request, Resource resource) throws Exception {
//		long contentLength = resource.contentLength();
//		String rangeHeader = request.getHeader(HttpHeaders.RANGE);
//		
//		if(rangeHeader != null) {
//			long[] range = getRange(rangeHeader, contentLength);
//			long start = range[0];
//			long end = range[1];
//			long rangeLength = Math.min(1024 * 1024, end - start + 1);
//			return new ResourceRegion(resource, 0, rangeLength);
//		}
//		
//		throw new RuntimeException("Invalid range");
//	}
//	
//	private long[] getRange(String rangeHeader, long contentLength) {
//		rangeHeader = rangeHeader.trim().substring("bytes=".length());
//		String[] range = rangeHeader.split("-");
//		long start = Long.parseLong(range[0]);
//		
//		long end = range.length > 1 ? Long.parseLong(range[1]) : contentLength - 1;
//		end = Math.min(end, contentLength - 1);
//		
//		if(start > end) {
//			throw new IllegalArgumentException("Invalid range: " + rangeHeader);
//		}
//		
//		return new long[]{start, end};
//	}
}
